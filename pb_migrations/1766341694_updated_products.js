/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // remove field
  collection.fields.removeById("relation3666391351")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "number551164161",
    "max": null,
    "min": null,
    "name": "clicks",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // add field
  collection.fields.addAt(5, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_842702175",
    "hidden": false,
    "id": "relation3666391351",
    "maxSelect": 0,
    "minSelect": 0,
    "name": "recipe",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("number551164161")

  return app.save(collection)
})
