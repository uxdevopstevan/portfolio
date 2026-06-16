'use client';

import { useEffect, useState, useRef, Suspense, type FormEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { QRCodeSVG } from 'qrcode.react';
import { getVerificationBotUsername } from '@/lib/verificationBot';
import Button from '@/components/ui/Button';
import ChamferedCard from '@/components/ui/ChamferedCard';

const WAITING_FOR_APPROVAL_TEXT = 'Waiting for approval...';
const HANDSHAKE_POLL_INTERVAL_MS = 2000;
const HANDSHAKE_POLL_MAX_MS = 2 * 60 * 1000;

function LoginContent() {
  const searchParams = useSearchParams();
  const [requestId, setRequestId] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'pending' | 'approved' | 'error'>('idle');
  const pollingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const redirectingRef = useRef(false);
  const initializedRef = useRef(false);
  const authCheckDoneRef = useRef(false);
  const botUsername = getVerificationBotUsername();
  const magicLinkError = searchParams.get('error');
  const [magicEmail, setMagicEmail] = useState('');
  const [magicBusy, setMagicBusy] = useState(false);
  const [magicFeedback, setMagicFeedback] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null);
  const [loginTab, setLoginTab] = useState<'telegram' | 'link'>('telegram');
  const [waitingTypedLen, setWaitingTypedLen] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const pollingStartedAtRef = useRef<number | null>(null);
  const activeRequestIdRef = useRef<string | null>(null);

  const magicLinkErrorMessage =
    magicLinkError === 'invalid_or_expired_magic'
      ? 'Your email sign-in link was invalid or has already been used. Use a fresh link from your welcome email, or sign in with Telegram below.'
      : magicLinkError === 'missing_token'
        ? 'No sign-in token was provided in the link.'
        : magicLinkError === 'member_not_found'
          ? 'We could not find an active membership for this sign-in link.'
          : magicLinkError === 'server_error'
            ? 'Sign-in failed due to a server error. Try again or use Telegram below.'
            : magicLinkError
              ? 'Sign-in could not be completed. Try Telegram below.'
              : null;

  useEffect(() => {
    // Check for redirect loop - if we have a special param, we're in a loop
    const isLoop = searchParams.get('_loop') === '1';
    if (isLoop) {
      console.error('Redirect loop detected! Stopping...');
      setStatus('error');
      return;
    }

    // Check for redirect loop using sessionStorage
    const lastRedirectAttempt = sessionStorage.getItem('lastRedirectAttempt');
    const now = Date.now();
    if (lastRedirectAttempt && (now - parseInt(lastRedirectAttempt)) < 3000) {
      // We just tried to redirect, something is wrong - clear and show error
      console.error('Redirect loop detected via sessionStorage!');
      sessionStorage.removeItem('lastRedirectAttempt');
      setStatus('error');
      return;
    }

    // Prevent re-initialization if already initialized or redirecting
    if (initializedRef.current || redirectingRef.current || authCheckDoneRef.current) {
      return;
    }

    authCheckDoneRef.current = true;

    // Check if already authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/me', { credentials: 'include' });
        const data = await response.json();
        if (data.success && data.user) {
          // Already authenticated, but verify cookie is actually set
          // Check debug endpoint to see cookie status
          const debugResponse = await fetch('/api/auth/debug', { credentials: 'include' });
          const debugData = await debugResponse.json();
          
          console.log('Auth check passed, debug info:', debugData);
          
          if (!debugData.token_valid) {
            // Token not valid, don't redirect - something is wrong with cookie
            console.error('Token not valid according to debug endpoint');
            setStatus('error');
            return false;
          }

          // Never redirect to root (/) to avoid loops - always use /hq
          let redirect = searchParams.get('redirect') || '/hq';
          if (redirect === '/' || !redirect || redirect === '') {
            redirect = '/hq';
          }

          // Store redirect attempt to prevent loops
          sessionStorage.setItem('lastRedirectAttempt', now.toString());
          
          redirectingRef.current = true;
          console.log('Already authenticated, redirecting to:', redirect);
          
          // Wait a bit longer to ensure cookie is fully processed by browser
          // Use a longer delay to ensure middleware can see the cookie
          setTimeout(() => {
            // Add a timestamp to force a fresh request
            const redirectUrl = new URL(redirect, window.location.origin);
            redirectUrl.searchParams.set('_t', Date.now().toString());
            window.location.replace(redirectUrl.toString());
          }, 2000); // Increased delay to 2 seconds
          return true;
        }
      } catch (error) {
        // Not authenticated, continue with login flow
        console.log('Not authenticated, continuing with login flow');
      }
      return false;
    };

    const initFlow = async () => {
      const alreadyAuth = await checkAuth();
      if (alreadyAuth) {
        return;
      }

      initializedRef.current = true;

      // Initialize auth request
      try {
        const response = await fetch('/api/auth/init', {
          method: 'POST',
        });
        const data = await response.json();

        if (data.success && data.request_id) {
          setRequestId(data.request_id);
          const deepLink = `https://t.me/${botUsername}?start=login_${data.request_id}`;
          setQrData(deepLink);
          setStatus('pending');
        } else {
          setStatus('error');
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setStatus('error');
      }
    };

    if (status === 'idle') {
      initFlow();
    }

    // Cleanup polling on unmount
    return () => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (status !== 'pending' || !qrData) {
      setWaitingTypedLen(0);
      return;
    }

    let cancelled = false;
    const text = WAITING_FOR_APPROVAL_TEXT;
    const total = text.length;
    const typeMs = 55;
    const holdMs = 1100;
    const gapBeforeRetypeMs = 280;

    const afterFullPause = (): void => {
      if (cancelled) return;
      setWaitingTypedLen(0);
      window.setTimeout(startTyping, gapBeforeRetypeMs);
    };

    const startTyping = (): void => {
      if (cancelled) return;
      let index = 0;
      const step = (): void => {
        if (cancelled) return;
        index += 1;
        setWaitingTypedLen(index);
        if (index < total) {
          window.setTimeout(step, typeMs);
        } else {
          window.setTimeout(afterFullPause, holdMs);
        }
      };
      step();
    };

    setWaitingTypedLen(0);
    startTyping();

    return () => {
      cancelled = true;
    };
  }, [status, qrData]);

  useEffect(() => {
    if (status !== 'pending' || !requestId) {
      return;
    }

    activeRequestIdRef.current = requestId;
    if (pollingStartedAtRef.current === null) {
      pollingStartedAtRef.current = Date.now();
    }

    const stopPolling = (): void => {
      if (pollingIntervalRef.current) {
        clearInterval(pollingIntervalRef.current);
        pollingIntervalRef.current = null;
      }
    };

    const expireSession = (message: string): void => {
      stopPolling();
      setErrorMessage(message);
      setStatus('error');
    };

    const isSessionTimedOut = (): boolean => {
      const started = pollingStartedAtRef.current;
      return started !== null && Date.now() - started > HANDSHAKE_POLL_MAX_MS;
    };

    const pollOnce = async (): Promise<void> => {
      if (redirectingRef.current || document.visibilityState === 'hidden') {
        return;
      }
      if (isSessionTimedOut()) {
        expireSession(
          'This sign-in session timed out after 2 minutes. Refresh the page and scan a new QR code in Telegram.'
        );
        return;
      }

      try {
        const response = await fetch(`/api/auth/check?request_id=${requestId}`, {
          credentials: 'include',
        });
        const data = await response.json();

        if (data.success) {
          if (data.status === 'approved') {
            stopPolling();

            if (redirectingRef.current) {
              return;
            }
            redirectingRef.current = true;

            setStatus('approved');

            await new Promise((resolve) => setTimeout(resolve, 2000));

            try {
              const verifyResponse = await fetch('/api/auth/me', { credentials: 'include' });
              const verifyData = await verifyResponse.json();

              if (verifyData.success && verifyData.user) {
                const debugResponse = await fetch('/api/auth/debug', { credentials: 'include' });
                const debugData = await debugResponse.json();

                if (!debugData.token_valid) {
                  setErrorMessage('Sign-in could not be verified. Please try again.');
                  setStatus('error');
                  redirectingRef.current = false;
                  return;
                }

                let redirect = searchParams.get('redirect') || '/hq';
                if (redirect === '/' || !redirect || redirect === '') {
                  redirect = '/hq';
                }

                sessionStorage.setItem('lastRedirectAttempt', Date.now().toString());

                setTimeout(() => {
                  const redirectUrl = new URL(redirect, window.location.origin);
                  redirectUrl.searchParams.set('_t', Date.now().toString());
                  window.location.replace(redirectUrl.toString());
                }, 1000);
              } else {
                setErrorMessage('Sign-in could not be verified. Please try again.');
                setStatus('error');
                redirectingRef.current = false;
              }
            } catch {
              setErrorMessage('Sign-in could not be verified. Please try again.');
              setStatus('error');
              redirectingRef.current = false;
            }
          } else if (data.status === 'expired') {
            expireSession(
              'This sign-in link has expired. Refresh the page and scan a new QR code in Telegram.'
            );
          }
        } else {
          console.error('Auth check failed:', data.error);
        }
      } catch (error) {
        console.error('Error checking auth status:', error);
      }
    };

    const startPolling = (): void => {
      stopPolling();
      void pollOnce();
      pollingIntervalRef.current = setInterval(() => {
        void pollOnce();
      }, HANDSHAKE_POLL_INTERVAL_MS);
    };

    startPolling();

    const onVisibilityChange = (): void => {
      if (document.visibilityState === 'hidden') {
        stopPolling();
        return;
      }
      if (isSessionTimedOut()) {
        expireSession(
          'This sign-in session timed out after 2 minutes. Refresh the page and scan a new QR code in Telegram.'
        );
        return;
      }
      startPolling();
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
      stopPolling();
    };
  }, [status, requestId, searchParams]);

  const handleOpenTelegram = () => {
    if (qrData) {
      window.open(qrData, '_blank');
    }
  };

  const handleRequestMagicLink = async (e: FormEvent) => {
    e.preventDefault();
    setMagicFeedback(null);
    const trimmed = magicEmail.trim();
    if (!trimmed) {
      setMagicFeedback({ kind: 'err', text: 'Enter the email address on your membership.' });
      return;
    }
    setMagicBusy(true);
    try {
      const response = await fetch('/api/auth/request-magic-link', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await response.json()) as { success?: boolean; message?: string; error?: string };
      if (data.success) {
        setMagicFeedback({
          kind: 'ok',
          text:
            data.message ||
            'If that email has an active membership, a sign-in link was sent. Check your inbox and spam folder.',
        });
        setMagicEmail('');
      } else {
        setMagicFeedback({ kind: 'err', text: data.error || 'Could not send a link. Try again.' });
      }
    } catch {
      setMagicFeedback({ kind: 'err', text: 'Network error. Try again.' });
    } finally {
      setMagicBusy(false);
    }
  };

  const tabBtnClass = (active: boolean) =>
    `flex-1 py-3 px-2 text-center text-sm font-rajdhani font-bold uppercase tracking-wide transition-colors border-b-2 -mb-px ${
      active
        ? 'border-hud-neon text-hud-neon'
        : 'border-transparent text-text-body hover:text-text-header'
    }`;

  const signInLinkPanel = (
    <div>
      <p className="text-xs text-text-body font-inter text-center mb-4 max-w-sm mx-auto">
        We will email a single-use link to the address on your active membership.
      </p>
      <form onSubmit={handleRequestMagicLink} className="space-y-3">
        <label htmlFor="magic-email" className="sr-only">
          Email
        </label>
        <input
          id="magic-email"
          type="email"
          name="email"
          autoComplete="email"
          value={magicEmail}
          onChange={(ev) => setMagicEmail(ev.target.value)}
          placeholder="you@example.com"
          className="hq-neon-focus w-full rounded-none border border-border-tactical bg-black/25 px-3 py-2.5 text-sm text-text-header placeholder:text-text-body/50 font-inter transition-[border-color] focus:outline-none disabled:opacity-50"
          disabled={magicBusy}
        />
        {magicFeedback && (
          <p
            className={`text-sm font-inter text-center ${magicFeedback.kind === 'ok' ? 'text-emerald-300/95' : 'text-red-400'}`}
            role="status"
          >
            {magicFeedback.text}
          </p>
        )}
        <Button type="submit" variant="outline" size="lg" className="w-full" disabled={magicBusy}>
          {magicBusy ? 'Sending…' : 'Email me a link'}
        </Button>
      </form>
    </div>
  );

  return (
    <div className="h-[100dvh] overflow-hidden overscroll-none scanlines">
      <div className="grid h-full min-h-0 grid-cols-1 overflow-y-auto overscroll-y-auto lg:grid-cols-2">
        <div className="hidden lg:flex flex-col items-center justify-center border-r border-border-tactical bg-hud-base px-6 py-12">
          <img
            src="/logo/logo.png"
            alt="DBR Protocol"
            className="w-full max-w-[200px] lg:max-w-md h-auto object-contain drop-shadow-md"
            width={400}
            height={120}
          />
        </div>

        <div className="flex items-center justify-center px-4 py-10 lg:py-12">
          <ChamferedCard variant="surface" className="max-w-md w-full text-text-header p-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-rajdhani font-bold uppercase tracking-wide text-white mb-3">
                Tactical Handshake
              </h1>
              <p className="text-text-body font-inter text-sm max-w-sm mx-auto">
                Scan with Telegram to authenticate (Tactical Handshake). If you did not get the post-purchase email,
                this QR still works once your payment email exists in our system.
              </p>
              {magicLinkErrorMessage && (
                <p
                  className="mt-4 text-sm text-hud-neon/95 font-inter max-w-sm mx-auto border border-hud-neon/40 px-3 py-2 bg-black/20"
                  role="alert"
                >
                  {magicLinkErrorMessage}
                </p>
              )}
            </div>

            <div className="flex border-b border-border-tactical" role="tablist" aria-label="Sign in method">
              <button
                type="button"
                role="tab"
                id="tab-telegram"
                aria-selected={loginTab === 'telegram'}
                aria-controls="panel-telegram"
                className={tabBtnClass(loginTab === 'telegram')}
                onClick={() => setLoginTab('telegram')}
              >
                Telegram sign-in
              </button>
              <button
                type="button"
                role="tab"
                id="tab-link"
                aria-selected={loginTab === 'link'}
                aria-controls="panel-link"
                className={tabBtnClass(loginTab === 'link')}
                onClick={() => setLoginTab('link')}
              >
                Sign-in link
              </button>
            </div>

            <div
              id="panel-telegram"
              role="tabpanel"
              aria-labelledby="tab-telegram"
              className={loginTab !== 'telegram' ? 'hidden' : 'pt-4'}
            >
              {status === 'pending' && qrData && (
                <div className="flex flex-col items-center text-center">
                  <div className="bg-white p-3 mb-4">
                    <QRCodeSVG value={qrData} size={180} level="M" />
                  </div>
                  <div className="w-full">
                    <Button
                      type="button"
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={handleOpenTelegram}
                    >
                      Open in Telegram
                    </Button>
                  </div>
                  <p className="sr-only">{WAITING_FOR_APPROVAL_TEXT}</p>
                  <p
                    className="text-xs text-text-body font-inter mt-4 min-h-[1.25rem] font-roboto-mono tracking-tight"
                    aria-hidden="true"
                  >
                    {WAITING_FOR_APPROVAL_TEXT.slice(0, waitingTypedLen)}
                    <span
                      className="inline-block w-[2px] h-[0.9em] translate-y-[0.05em] bg-hud-neon/80 ml-0.5 animate-pulse align-middle"
                      aria-hidden
                    />
                  </p>
                </div>
              )}

              {status === 'approved' && (
                <div className="text-center">
                  <div className="text-4xl mb-4">✅</div>
                  <p className="text-lg font-rajdhani font-bold uppercase tracking-wide text-hud-neon mb-2">
                    Authentication successful!
                  </p>
                  <p className="text-sm text-text-body font-inter">
                    Verifying cookie and redirecting...
                  </p>
                </div>
              )}

              {status === 'error' && (
                <div className="text-center">
                  <div className="text-4xl mb-4">❌</div>
                  <p className="text-lg font-semibold text-red-500 mb-2">
                    {errorMessage ? 'Sign-in could not be completed' : 'Authentication failed'}
                  </p>
                  <p className="text-sm text-text-body font-inter mb-4">
                    {errorMessage ??
                      'The cookie may not be accessible to middleware, or a redirect loop was detected.'}
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-full"
                    onClick={() => {
                      sessionStorage.removeItem('lastRedirectAttempt');
                      pollingStartedAtRef.current = null;
                      activeRequestIdRef.current = null;
                      setErrorMessage(null);
                      setStatus('idle');
                      redirectingRef.current = false;
                      initializedRef.current = false;
                      authCheckDoneRef.current = false;
                      window.location.reload();
                    }}
                  >
                    Try Again
                  </Button>
                </div>
              )}

              {status === 'idle' && (
                <div className="text-center">
                  <div className="animate-spin h-12 w-12 border-b-2 border-hud-neon mx-auto" />
                  <p className="text-sm text-text-body font-inter mt-4">
                    Initializing...
                  </p>
                </div>
              )}
            </div>

            <div
              id="panel-link"
              role="tabpanel"
              aria-labelledby="tab-link"
              className={loginTab !== 'link' ? 'hidden' : 'pt-4'}
            >
              {signInLinkPanel}
            </div>
          </ChamferedCard>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[100dvh] overflow-hidden overscroll-none bg-hud-base scanlines">
          <div className="grid h-full min-h-0 grid-cols-1 overflow-y-auto overscroll-y-auto lg:grid-cols-2">
          <div className="hidden lg:flex flex-col items-center justify-center border-r border-border-tactical bg-hud-base p-8">
            <div className="h-24 w-64 rounded bg-hud-base/50 animate-pulse" aria-hidden />
          </div>
          <div className="flex items-center justify-center px-4 py-12">
            <ChamferedCard variant="surface" className="max-w-md w-full text-text-header p-6 text-center">
              <div className="animate-spin h-12 w-12 border-b-2 border-hud-neon mx-auto" />
              <p className="text-sm text-text-body font-inter mt-4">Loading...</p>
            </ChamferedCard>
          </div>
          </div>
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
