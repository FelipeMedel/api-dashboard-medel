import 'reflect-metadata';
var express = require('express');
var bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
var http = require('http');
require('express-async-errors');
import * as cors from 'cors';
import appRouter from './router.routes';
import ErrorMiddleware from '../middlewares/error.middleware';
import NotFoundMiddleware from '../middlewares/not-found.middleware';

const APP = express(),
	SERVER = http.createServer(APP),
	error = new ErrorMiddleware(),
	notFound = new NotFoundMiddleware();

APP.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json({ limit: '200mb' }))
	.use(helmet())
	.use(compression())
	.use(morgan('dev'))
	.use(
		cors({
			origin: '*',
			methods: 'GET, POST, PUT, DELETE, OPTIONS, PATH',
			allowedHeaders: 'Content-Type,Authorization',
			preflightContinue: false,
			optionsSuccessStatus: 200
		})
	);

APP.disable('x-powered-by');

appRouter(APP);
APP.use(notFound.notFound);
APP.use(error.errors);

export default SERVER;
