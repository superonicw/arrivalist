FROM ruby:2.6.0

RUN mkdir /backend
WORKDIR /backend

COPY Gemfile ./
COPY Gemfile.lock ./

RUN bundle
