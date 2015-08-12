require File.expand_path '../spec_helper.rb', __FILE__

describe DockerLayers::App do
  describe 'GET /' do
    it "should respond with status 200" do
      get '/'
      expect(last_response).to be_ok
    end
  end

  describe 'GET /trees.json' do
    before { allow(Docker::Image).to receive(:all) { [] } }

    it "should return json" do
      get '/trees.json'
      expect(last_response.content_type).to eq 'application/json'
    end
  end
end
