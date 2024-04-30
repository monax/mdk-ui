import * as Sentry from '@sentry/react';
import {
  addBreadcrumb as addBreadcrumbSentry,
  Breadcrumb,
  captureException as captureExceptionSentry,
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
  Sentry.init(assembleConfig(config));

  Sentry.setTags({
    component: config.component,
  });
};

const assembleConfig = (config: Config): Sentry.BrowserOptions => {
  return {
    dsn: config.sentryDsn,
    release: `v${config.appVersion}`,
    environment: config.stack,
    integrations: [
      new Sentry.Integrations.HttpContext(),
      new Sentry.Integrations.Breadcrumbs({
        console: true,
        dom: true,
        fetch: false,
        history: false,
        sentry: false,
        xhr: true,
      }),
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV6Instrumentation(
          React.useEffect,
          useLocation,
          useNavigationType,
          createRoutesFromChildren,
          matchRoutes,
        ),
      }),
      new Sentry.Replay(),
    ],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  };
};
