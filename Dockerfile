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

RUN mkdir -p /bulbs
WORKDIR /bulbs

# Only build NPM on config change
ADD package.json /bulbs/
RUN npm install

ENV PATH /bulbs/node_modules/.bin:$PATH

# Only build Bower on config change
ADD bower.json /bulbs/
RUN bower install --config.interactive=false install --allow-root --force-latest

ADD . /bulbs

# TODO: Move to top
# RUN apt-get install xvfb
