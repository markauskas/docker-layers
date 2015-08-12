var Volume = React.createClass({
  render: function() {
    var tags = [];
    if (this.props.data.tags != null) {
      tags = this.props.data.tags.map(function(tag) {
        return (
          <div className="tag">{tag}</div>
        );
      });
    }
    var childrenNodes = this.props.data.children.map(function(volume) {
      return (
        <Volume data={volume} />
      );
    });
    return (
      <div className="volume">
        <div className="volumeId">
          {this.props.data.short_id}
          <br/>
          size: <span className="size">{Math.round(this.props.data.size / 10000) / 100}M</span>
          <br/>
          {tags}
        </div>
        {childrenNodes}
      </div>
    );
  }
})

var VolumeBox = React.createClass({displayName: 'ImageBox',
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
    var rootNodes = this.state.data.map(function(root) {
      return (
        <Volume data={root} />
      );
    });
    return (
      <div className="volumeBox">
        {rootNodes}
      </div>
    );
  }
});
React.render(
  <VolumeBox url="/trees.json" />,
  document.getElementById('content')
);
