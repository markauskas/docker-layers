require File.expand_path '../spec_helper.rb', __FILE__

describe DockerLayers::App do
  it "should respond with status 200" do
    get '/'
    expect(last_response).to be_ok
  end
end
