require 'rubygems'
require 'bundler/setup'
require 'sinatra'

module DockerLayers
  class App < Sinatra::Base
    get '/' do
      'Hello World'
    end
  end
end
