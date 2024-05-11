# frozen_string_literal: true

class PagesController < ApplicationController
  include ReactOnRails::Controller

  before_action :set_stories

  def index
    redux_store("routerStoriesStore", props: stories_json_string)
    render_html
  end

  private


  def set_stories
    puts "****** set_story *********"
    @stories = Story.all.order("id DESC")
  end

  
  def stories_json_string
    stories_array = render_to_string(template: "/stories/index", locals: { stories: Story.all }, formats: :json)
    { "stories": JSON.parse(stories_array) }.to_json
  end
  

  def render_html
    respond_to do |format|
      format.html
    end
  end
end
