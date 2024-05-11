class RemoveImageIdFromStories < ActiveRecord::Migration[7.1]
  def change
    remove_reference :stories, :image, foreign_key: true
    #remove_column :stories, :image_id
    
  end
end
