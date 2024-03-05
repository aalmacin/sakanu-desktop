module.exports = function override(config, env) {
    config.module.rules.push({
        test: /\.css$/,
        use: 'raw-loader',
    });

    return config;
};