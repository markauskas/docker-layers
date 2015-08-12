require File.expand_path '../spec_helper.rb', __FILE__

describe DockerLayers::App do
  describe 'GET /' do
    it "should respond with status 200" do
      get '/'
      expect(last_response).to be_ok
    end
  end

  describe 'GET /tree.json' do
    it "should return json" do
      get '/tree.json'
      expect(last_response.content_type).to eq 'application/json'
    end
  end
end
