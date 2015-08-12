require 'docker'

module DockerLayers
  class Volume
    attr_reader :id
    attr_reader :tags
    attr_accessor :children

    def initialize(data)
      @id       = data[:id]
      @tags     = data[:tags]
      @children = []
    end

    def short_id
      id ? id.to_s[0,10] : id
    end

    def inspect
      "#<Volume id=#{short_id.inspect} children=#{children.inspect}>"
    end

    def to_tree(spaces = 0)
      (" " * spaces) + "- #{short_id}\n" + children.map { |c| c.to_tree(spaces + 2) }.join("")
    end

    class << self
      def trees
        merge_trees(build_subtrees)
      end

      private

      # Finds common roots and merges them recursively by merging their children
      def merge_trees(trees)
        trees.inject([]) do |trees, tree|
          candidate = trees.detect { |t| t.id == tree.id }
          if candidate
            candidate.children = merge_trees(candidate.children + tree.children) if tree.children.length > 0
            trees
          else
            trees + [tree]
          end
        end
      end

      def build_subtrees
        images.map { |image| build_tree_for_image(image) }
      end

      def build_tree_for_image(image)
        last = nil
        image.history.each do |volume|
          v = Volume.new(
            id:   volume["Id"],
            tags: volume["Tags"]
          )
          v.children << last if last
          last = v
        end
        last
      end

      def images
        Docker::Image.all
      end
    end
  end
end
