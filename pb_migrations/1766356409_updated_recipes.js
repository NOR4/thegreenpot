/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // remove field
  collection.fields.removeById("relation1111877559")

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation4270524300",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "base_ingredients_v2",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation1111877559",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "base_ingredients",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("relation4270524300")

  return app.save(collection)
})
