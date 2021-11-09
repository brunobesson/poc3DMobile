(function (window) {
  window.__env = window.__env || {};

  // Describe how the 3D models are modeled
  window.__env.modelsDatabaseKey = 'design/obj/marked/low-poly';
  // Endpoint to 3D models DB
  window.__env.modelsResourcesEndpoint = {
    url: 'https://info3d-ppr.schneider-electric.com/api/v1/modelsResources'
  };
  // Endpoint of 3D reference point allowing graphical composition in 3D Editor
  window.__env.referencePointsEndpoint = {
    url: 'https://info3d-ppr.schneider-electric.com/api/v1/referencePoints'
  };
  window.__env.composer3DEndpoint = {
    url: 'https://composer3d-ppr.schneider-electric.com/rest/3dcomposer/v1.1/skeleton/composition'
  };
})(this);
