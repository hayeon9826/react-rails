class CreateBanners < ActiveRecord::Migration[6.0]
  def change
    create_table :banners do |t|
      t.string :name
      t.string :image
      t.integer :status, default: 0
      t.boolean :is_external, default: false
      t.integer :position
      t.string :link
      t.integer :banner_type, default: 0

      t.timestamps
    end
  end
end
