module.exports = {
    apps: [
        {
            name: 'User Module',
            script: './bin/www',
            env: {
                'PORT': 3000,
                'NODE_ENV': 'development',
                'database': 'mongodb://localhost:27017/user_module'
            },
            env_testing: {
                'PORT': 8080,
                'NODE_ENV': 'testing',
                'database': 'mongodb://localhost:27017/user_module'
            },
            env_production: {
                'PORT': 8080,
                'NODE_ENV': 'production',
                'database': 'mongodb://15.206.101.118:27017/naraci/user_module'
            }
        }
    ],
    deploy: {
        production: {
            user: 'node',
            host: '212.83.163.1',
            ref: 'origin/master',
            repo: 'git@github.com:repo.git',
            path: '/var/www/production',
            'post-deploy': 'npm i && pm2 start ./utils/ecosystem.config.js --env production --update-env'
        }
    }
}
