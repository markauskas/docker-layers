
$: << File.expand_path('../app/models', __FILE__)

require 'rubygems'
require 'bundler/setup'
require 'sinatra'
require 'sinatra/json'
require 'volume'

module DockerLayers
  class App < Sinatra::Base
    set :views, settings.root + '/app/views'
    set :logging, true
    set :static, true

    get '/' do
      erb :index
    end

    get '/trees.json' do
      json DockerLayers::Volume.tree_hash(params['filter']), content_type: :json
    end
  end
end
