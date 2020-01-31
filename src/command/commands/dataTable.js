/*
 *
 */
'use strict';
import DataTable from '../../class/DataTable';

(function(c) {
    const { COMMAND_TYPES, RECORDABLE } = Entry.STATIC;

    c[COMMAND_TYPES.dataTableAddSource] = {
        do(table) {
            DataTable.unbanBlock();
            DataTable.tables.push(table);
            Entry.playground.reloadPlayground();
            Entry.playground.refreshPlayground();
            Entry.playground.selectTable(table);
        },
        state(table) {
            return [table];
        },
        log(table) {
            return [['table', table]];
        },
        recordable: RECORDABLE.SUPPORT,
        validate: false,
        undo: 'dataTableRemoveSource',
        dom: ['playground', 'tableAddButton'],
    };

    c[COMMAND_TYPES.dataTableRemoveSource] = {
        do(table = {}) {
            const index = DataTable.getIndex(table);
            if (index < 0) {
                console.warn('not found table', table);
                return;
            }
            DataTable.tables.splice(index, 1);
            Entry.playground.reloadPlayground();
            Entry.playground.refreshPlayground();
            if (table === DataTable.selected) {
                Entry.playground.selectTable(DataTable.tables[0]);
            }
        },
        state(table) {
            return [table];
        },
        log(table) {
            return [['table', table]];
        },
        recordable: RECORDABLE.SUPPORT,
        validate: false,
        undo: 'dataTableAddSource',
        dom: ['playground', 'tableAddButton'],
    };
})(Entry.Command);
