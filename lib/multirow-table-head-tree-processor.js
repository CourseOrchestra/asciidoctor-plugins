const multiTableHeadTreeProcessor = function () {
  this.process((doc) => {
    for (const table of doc.findBy({ context: 'table', traverse_documents: true })) {
      const hrows = table.getAttribute('hrows')
      if (hrows) {
        const rows = table.rows
        const moveRows = Math.min(+hrows - rows.head.length, rows.body.length)
        if (moveRows) rows.head.push(...rows.body.splice(0, moveRows))
      }
    }
  })
}

module.exports.register = function register (registry) {
  if (typeof registry.register === 'function') {
    registry.register(function () {
      this.treeProcessor(multiTableHeadTreeProcessor)
    })
  } else if (typeof registry.block === 'function') {
    registry.treeProcessor(multiTableHeadTreeProcessor)
  }
  return registry
}
