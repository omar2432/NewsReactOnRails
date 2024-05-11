# frozen_string_literal: true

class StoriesChannel < ApplicationCable::Channel
    def subscribed
      stream_from "stories"
    end
end
  