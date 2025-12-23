/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // add field
  collection.fields.addAt(14, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation401121977",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "base_ingredients_v4",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "json1802738295",
    "maxSize": 0,
    "name": "base_ingredients_json",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // remove field
  collection.fields.removeById("relation401121977")

  // remove field
  collection.fields.removeById("json1802738295")

  return app.save(collection)
})
