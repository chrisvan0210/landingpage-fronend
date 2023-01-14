const withLess = require('next-less');
const lessToJS = require('less-vars-to-js');
const path = require('path');
const fs = require('fs');

const themeVariables = lessToJS(
    fs.readFileSync(path.resolve(__dirname, './src/styles/antd-custom.less'), 'utf8')
);

module.exports = withLess({
    webpack: (config, { isServer }) => {
        if (isServer) {
            const antStyles = /antd\/.*?\/style.*?/;
            const origExternals = [...config.externals];
            config.externals = [
                (context, request, callback) => {
                    if (request.match(antStyles)) return callback();
                    if (typeof origExternals[0] === 'function') {
                        origExternals[0](context, request, callback);
                    } else {
                        callback();
                    }
                },
                ...(typeof origExternals[0] === 'function' ? [] : origExternals),
            ];

            config.module.rules.unshift({
                test: antStyles,
                use: 'null-loader',
            });
        }
        config = withLess.extend({
            lessLoaderOptions: {
                javascriptEnabled: true,
                modifyVars: themeVariables
            },
            use: [
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            javascriptEnabled: true,
                            modifyVars: themeVariables,
                        },
                    },
                },
            ],
        })(config, { isServer });

        return config;
    },
});
