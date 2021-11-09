declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __env: EnvironmentDetails;
  }
}

import { EnvironmentDetails, EnvService } from './env.service';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EnvServiceFactory = (): EnvironmentDetails => {
  const env = new EnvService();

  // Read environment variables from browser window
  // eslint-disable-next-line no-underscore-dangle
  const browserWindowEnv = window.__env || {};

  // Assign environment variables from browser window to env
  // In the current implementation, properties from config.js overwrite defaults from the EnvService.
  // If needed, a deep merge can be performed here to merge properties instead of overwriting them.
  for (const key in browserWindowEnv) {
    if (browserWindowEnv.hasOwnProperty(key)) {
      env[key as keyof typeof env] =
        browserWindowEnv[key as keyof typeof browserWindowEnv];
    }
  }

  return env;
};

export const ENV_SERVICE_PROVIDER = {
  provide: EnvService,
  useFactory: EnvServiceFactory,
  deps: [] as any[]
};
