class CreateImages < ActiveRecord::Migration[7.1]
  def change
    create_table :images do |t|
      t.binary :image, using: 'image::bytea'
      t.timestamps
    end
  end
end
