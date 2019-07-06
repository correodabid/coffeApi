const deployDocker = false;

let deploy: any = {};

if (deployDocker) {
  deploy.url = 'mongo';
  deploy.port = '27017';
} else {
  deploy.url = 'localhost';
  deploy.port = '27017';
}

export { deploy };
