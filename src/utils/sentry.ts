import type { Breadcrumb, BrowserOptions } from '@sentry/react';
import {
  addBreadcrumb as addBreadcrumbSentry,
  breadcrumbsIntegration,
  captureException as captureExceptionSentry,
  init as initialiseSentry,
  reactRouterV6BrowserTracingIntegration,
  replayIntegration,
} from '@sentry/react';
import type { CaptureContext } from '@sentry/types';
import { isErrorLike } from 'mdk-schema';
import React from 'react';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

export function addBreadcrumb(breadcrumb: Breadcrumb): void {
  console.debug(breadcrumb.message, { ...breadcrumb.data });
  addBreadcrumbSentry(breadcrumb);
}

export function captureException(error: Error | unknown, captureContext?: CaptureContext): void {
  if (isErrorLike(error)) console.debug(error.message, { ...captureContext });
  captureExceptionSentry(error, captureContext);
}

type Config = {
  component: string;
  appVersion: string;
  stack: string;
  sentryDsn: string;
};

export const initSentry = (config: Config): void => {
  if (!config.sentryDsn) return;
  initialiseSentry(assembleConfig(config));
};

const assembleConfig = (config: Config): BrowserOptions => {
  return {
    dsn: config.sentryDsn,
    release: `v${config.appVersion}`,
    environment: config.stack,
    integrations: [
      breadcrumbsIntegration({
        console: true,
        dom: true,
        fetch: false,
        history: false,
        sentry: false,
        xhr: true,
      }),
      reactRouterV6BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
      replayIntegration(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
    initialScope: {
      tags: {
        component: config.component,
      },
    },
  };
};
