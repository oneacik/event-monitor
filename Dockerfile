FROM node:13
ADD . .
RUN ["npm", "run-script", "build"]
CMD ["node", "./bin/server.js"]
EXPOSE 3000
