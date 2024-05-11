# frozen_string_literal: true

class StoryRelayJob < ApplicationJob
    def perform(story)
      ActionCable.server.broadcast "stories", story unless story.destroyed?
    end
end
  