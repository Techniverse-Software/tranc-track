// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  // apiUrl: "http://35.177.143.238:5001/api/v1/",
  // socketUrl: "http://35.177.143.238:5001",
  socketUrl: 'http://3.80.209.97',
  apiUrl: 'http://3.80.209.97/api/v1/',
  mediaUrl: "http://3.80.209.97/assets/",
  googleMapApiKey: "AIzaSyAtHMP9FNoG6Z7K1uYoQS3gLXo3HSMvHHs",
};
