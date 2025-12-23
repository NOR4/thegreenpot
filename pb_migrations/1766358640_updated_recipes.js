/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // remove field
  collection.fields.removeById("relation4270524300")

  // remove field
  collection.fields.removeById("relation2307667738")

  // remove field
  collection.fields.removeById("relation401121977")

  // remove field
  collection.fields.removeById("json1802738295")

  // remove field
  collection.fields.removeById("relation3331123816")

  // remove field
  collection.fields.removeById("json1264587087")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json267547984",
    "maxSize": 0,
    "name": "ingredients_text",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation1264587087",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "ingredients",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(13, new Field({
    "hidden": false,
    "id": "json1602156498",
    "maxSize": 0,
    "name": "ingredients_json",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_842702175")

  // add field
  collection.fields.addAt(8, new Field({
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

  // add field
  collection.fields.addAt(9, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation2307667738",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "base_ingredients_v3",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(10, new Field({
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
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "json1802738295",
    "maxSize": 0,
    "name": "base_ingredients_json",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(12, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3146854971",
    "hidden": false,
    "id": "relation3331123816",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "base_ingredientes_v5",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(14, new Field({
    "hidden": false,
    "id": "json1264587087",
    "maxSize": 0,
    "name": "ingredients",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("json267547984")

  // remove field
  collection.fields.removeById("relation1264587087")

  // remove field
  collection.fields.removeById("json1602156498")

  return app.save(collection)
})
