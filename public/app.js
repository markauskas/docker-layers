// returns the number of leaf-volumes that are reachable from the given volume node
var countLeafs = function(volume) {
  if (volume.children.length > 0) {
    return volume.children.reduce(function(acc, cur, idx, arr) {
      return acc + countLeafs(cur);
    }, 0);
  }
  else {
    return 1;
  }
};

var VolumeInfo = React.createClass({
  render: function() {
    var tags = "";
    if (this.props.tags != null) {
      tags = this.props.tags.map(function(tag) {
        return (
          <div key={tag} className="tag">{tag}</div>
        );
      });
    }
    return (
      <div className="volumeInfo">
        {this.props.id.substring(0, 10)} / {Math.round(this.props.size / 10000) / 100}M<br/>
        {tags}
      </div>
    );
  }
});

var VolumeChildren = React.createClass({
  render: function() {
    var volumeNodes = this.props.volumes.map(function(volume) {
      return (
        <Volume key={volume.id} data={volume}/>
      );
    });
    return (
      <div className="children">
        {volumeNodes}
      </div>
    );
  }
});

var Volume = React.createClass({
  render: function() {
    var leafs = countLeafs(this.props.data);
    var children = "";
    if (this.props.data.children.length > 0) {
      children = <VolumeChildren volumes={this.props.data.children}/>
    }
    return (
      <div className="volume" style={{flex: leafs}}>
        <VolumeInfo id={this.props.data.id} tags={this.props.data.tags} size={this.props.data.size} leafs={leafs} />
        {children}
      </div>
    );
  }
})

var VolumeContainer = React.createClass({
  displayName: 'VolumeContainer',
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  render: function() {
    var leafs = this.state.data.reduce(function(acc, cur, idx, arr) {
      return (acc + countLeafs(cur));
    }, 0);
    var rootNodes = this.state.data.map(function(volume) {
      return (
        <Volume key={volume.id} data={volume} />
      );
    });
    return (
      <div className="volumeContainer" style={{width: ((leafs * 300) + "px")}}>
        {rootNodes}
      </div>
    );
  }
});
React.render(
  <VolumeContainer url={"/trees.json" + window.location.search} />,
  document.getElementById('content')
);
