import winston from "winston"; 

// Niveles de alarma del codigo

const customLevelOpt = {

    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

        colors: {
        fatal: 'red',
        error: 'orange',
        warning: 'yellow',
        info: 'blue',
        http: 'white',
        debug: 'cyan'
    }
};

const logger = winston.createLogger({
    levels: customLevelOpt.levels,

    // Transportation 

    transports: [
        new winston.transports.Console({
            level: 'info',
            format: winston.format.combine(
                winston.format.colorize({ color: customLevelOpt.colors }),
                winston.format.simple()
            )
        }),

        // Avisos de winston

        new winston.transports.File({
            level: 'warning',
            filename: './warning.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'error',
            filename: './errors.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'http',
            filename: './http.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'debug',
            filename: './debug.log',
            format: winston.format.simple()
        }),

        new winston.transports.File({
            level: 'fatal',
            filename: './fatal.log',
            format: winston.format.simple()
        })
    ]
});
 
// Middleware para usar el logger en request
export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.info(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
    next();
};




