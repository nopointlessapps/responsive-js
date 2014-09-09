Package.describe({
    summary: " A simple wrapper around Response.js adding reactive API and template helpers",
    version: "1.0.0",
    git: " \* Fill me in! *\ "
});

Package.onUse(function (api) {
    api.versionsFrom('METEOR@0.9.1.1');

    api.use('ui');
    api.use('tracker');

    api.addFiles(['client/lib/response.0.9.0.min.js', 'client/npa:responsive-js.js'], 'client');

    api.export('Responsive', 'client');
});

Package.onTest(function (api) {
    api.use('tinytest');
    api.use('npa:responsive-js');

});
