class Story < ApplicationRecord
  belongs_to :category
  has_one_attached :image

  after_commit { StoryRelayJob.perform_later(self) }
  before_destroy :delete_image

  private

  def delete_image
    image.purge if image.attached?
  end

end
