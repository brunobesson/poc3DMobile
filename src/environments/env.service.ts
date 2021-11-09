import { Injectable } from '@angular/core';

export interface EnvironmentDetails {
  modelsDatabaseKey: string;
  modelsResourcesEndpoint: UrlToken;
  referencePointsEndpoint: UrlToken;
  composer3DEndpoint: UrlToken;
}

export interface UrlToken {
  url: string | null;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EnvService implements EnvironmentDetails{
  // The values that are defined here are the default values that can
  // be overridden by config.js :
  public modelsDatabaseKey = 'design/obj/marked/low-poly';
  public modelsResourcesEndpoint: UrlToken = {
    url: 'https://info3d.schneider-electric.com/api/v1/modelsResources',
    token: 'de5eabe1540c8e5a8801a4492795e364'
  };
  public referencePointsEndpoint: UrlToken = {
    url: 'https://info3d.schneider-electric.com/api/v1/referencePoints',
    token: 'de5eabe1540c8e5a8801a4492795e364'
  };
  public composer3DEndpoint: UrlToken = {
    url: 'https://composer3d.schneider-electric.com/rest/3dcomposer/v1.1/skeleton/composition',
    token: 'de5eabe1540c8e5a8801a4492795e364'
   };

}
