'use client';

import * as React from 'react';
import { useEffect } from 'react';
import supabaseClient from '@/lib/supabase-client';
import { cn } from '@/lib/utils';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

export default function AppIframe(props: { className?: string; pathname?: string }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_EDWIX_APP_URL;

  const _postMesageToIframe = (data: { event: AuthChangeEvent; session: Session | null }) => {
    // Get the iframe element
    const iframe = document.querySelector('iframe');
    if (!iframe || !iframe.contentWindow) return;

    iframe.contentWindow.postMessage(data, baseUrl ?? '');
  };

  //   const _sendFirstMessageToIframe = async () => {
  //     const { data, error } = await supabaseClient.auth.getSession();
  //     if (error || !data.session) return;
  //     _postMesageToIframe({ event: 'SIGNED_IN', session: data.session });
  //   };

  //   useEffect(() => {
  //     setTimeout(() => {
  //       _sendFirstMessageToIframe();
  //     }, 5000);
  //   }, [baseUrl]);

  useEffect(() => {
    const handleAuthStateChange = async (event: AuthChangeEvent, session: Session | null) => {
      _postMesageToIframe({ event, session });
    };

    const sub = supabaseClient.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      sub.data.subscription.unsubscribe();
    };
  }, [baseUrl]);

  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if (e.origin !== baseUrl) {
        return;
      }

      const currentSession = await supabaseClient.auth.getSession();
      if (currentSession.error) return;

      if (
        ['TOKEN_REFRESHED', 'SIGNED_IN'].includes(e.data.event) &&
        e.data.session.access_token !== currentSession.data.session?.access_token
      ) {
        const { access_token, refresh_token } = e.data.session;
        await supabaseClient.auth.setSession({ access_token, refresh_token });

        if (e.data.event === 'SIGNED_IN') {
          router.push('/');
        }

        return;
      }

      if (
        e.data.event === 'SIGNED_OUT' ||
        (e.data.event === 'INITIAL_SESSION' && !e.data.session && currentSession.data.session)
      ) {
        await supabaseClient.auth.signOut();
        router.push('/auth/login');
        return;
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [baseUrl]);

  if (!baseUrl) {
    return <div>Error: NEXT_PUBLIC_EDWIX_APP_URL is not configured</div>;
  }

  const url = new URL(props.pathname ?? '/', baseUrl);
  url.searchParams.set('hideMenu', '');
  const urlString = url.toString();

  return (
    <iframe
      key={urlString}
      src={urlString}
      className={cn('w-full h-full flex-grow', props.className)}
    />
  );
}
