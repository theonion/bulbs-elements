FROM node:5.12
MAINTAINER Onion Tech <webtech@theonion.com>

RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/*

# TODO: is gcc4.9 (default) OK?
#RUN apt-get install -y software-properties-common
## TODO: Merge with above
#RUN add-apt-repository ppa:ubuntu-toolchain-r/test
#RUN apt-get install -y g++-4.8

# TODO: Better folder name than "project"

RUN mkdir -p /project
WORKDIR /project

# Only build NPM on config change
ADD package.json /project/
RUN npm install

ENV PATH /project/node_modules/.bin:$PATH

# Only build Bower on config change
ADD bower.json /project/
RUN bower install --config.interactive=false install --allow-root --force-latest

ADD . /project

# TODO: webpack build? (so don't need to run for every test)
