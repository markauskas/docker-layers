
$: << File.expand_path('../app/models', __FILE__)

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/json'
require 'volume'

module DockerLayers
  class App < Sinatra::Base
    get '/' do
      'Hello World'
    end

    get '/tree.json' do
      json DockerLayers::Volume.tree, content_type: :json
    end
  end
end
