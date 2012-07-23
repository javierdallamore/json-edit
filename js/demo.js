/*global require */
require.config({
    baseUrl: "js/",
    paths: {
        "json": "http://cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2",
        "ace": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/ace",
        "ace.json": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/mode-json",
        "ace.theme": "http://cdnjs.cloudflare.com/ajax/libs/ace/0.2.0/theme-merbivore_soft",
        "jquery": "http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min",
        "jqueryui": "http://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.8.19/jquery-ui.min",
        "legoparser": "http://marianoguerra.github.com/legojs/src/legoparser",
        "jquery.lego": "http://marianoguerra.github.com/legojs/src/jquery.lego",
        "prettyPrint": "http://cdnjs.cloudflare.com/ajax/libs/prettify/188.0.0/prettify",
        "jquery.taghandler": "https://raw.github.com/ioncache/Tag-Handler/master/js/jquery.taghandler",
        "json.edit": "../src/json.edit",
        "json.schema": "../src/json.schema",
        "nsgen": "../src/nsgen",

        // hints
        "hint.tags": "../src/addons/tags",
        "hint.autocomplete": "../src/addons/autocomplete",
        "hint.date": "../src/addons/date",
        "hint.color": "../src/addons/color/color",
        "hint.tabs": "../src/addons/tabs",
        "hint.password": "../src/addons/password",
        "hint.readonly": "../src/addons/readonly",
        "hint.enumlabels": "../src/addons/enumlabels",
        "hint.squim": "../src/addons/squim",
        "hint.tabarray": "../src/addons/tabarray",
        "hint.summarylist": "../src/addons/summarylist/addon",

        // needed by hints
        // by color hint
        "colorPicker": "../src/addons/color/picker/colorPicker",

        // by squide hint
        "squim": "http://marianoguerra.github.com/squim/src/squim",
        "squim.types": "http://marianoguerra.github.com/squim/src/squim.types",
        "squim.parser": "http://marianoguerra.github.com/squim/src/squim.parser",
        "squim.error": "http://marianoguerra.github.com/squim/src/squim.error",
        "squim.ground": "http://marianoguerra.github.com/squim/src/squim.ground",
        "squim.util": "http://marianoguerra.github.com/squim/src/squim.util",

        "squide": "http://marianoguerra.github.com/squide/src/squide",
        "squide.types": "http://marianoguerra.github.com/squide/src/squide.types",
        "squide.ui": "http://marianoguerra.github.com/squide/src/squide.ui",

        // by summarylist
        "dustjs": "http://linkedin.github.com/dustjs/dist/dust-full-1.0.0"
    },

    shim: {
        json: {
            exports: "JSON"
        },
        ace: {
            exports: "ace",
            deps: ["ace.json", "ace.theme"]
        },
        prettyPrint: {
            exports: "prettyPrint"
        },
        colorPicker: {
            exports: "colorPicker"
        },
        dustjs: {
            exports: "dust"
        }
    }
});

require(["jquery", "json.edit", "demos", "ace", "jquery.lego", "prettyPrint", "json",

        "hint.tags", "hint.autocomplete", "hint.date", "hint.color", "hint.tabs",
        "hint.password", "hint.readonly", "hint.enumlabels", "hint.squim", "hint.tabarray",
        "hint.summarylist"],

        function ($, mJsonEdit, demos, ace, legojs, prettyPrint, JSON) {
    "use strict";
    function startEditor(id, title, description, content) {
        var editor, outputId = id + "-out",
            jsonEditData;

        function updateDemo() {
            var content = editor.getSession().getDocument().getValue(),
                data;

            try {
                data = JSON.parse(content);
            } catch (error) {
                alert(error);
                return;
            }

            $("#" + outputId).html("");
            jsonEditData = mJsonEdit(outputId, data);
        }

        function validateForm() {
            var result = jsonEditData.collect();

            $("#" + id + "-data").html(JSON.stringify(result.data, null, 2));
            $("#" + id + "-validation").html(JSON.stringify(result.result, null, 2));
            prettyPrint();
        }

        $("body").append($.lego({
            "div": {
                "class": "demo-wrapper",
                "$childs": [{
                    "div": {
                        "class": "demo-box",
                        "$childs": [{
                            "h3": title
                        }, {
                            "p": {
                                "class": "demo-desc",
                                "$childs": description
                            }
                        }, {
                            "pre": {
                                "id": id,
                                "class": "editor",
                                "$childs": JSON.stringify(content, null, 2)
                            }
                        }, {
                            "div": {
                                "id": outputId,
                                "class": "demo-out"
                            }
                        }]
                    }
                }, {
                    "div": {
                        "class": "demo-outputs",
                        "$childs": [{
                            "pre": {
                                "id": id + "-validation",
                                "class": "demo-validation prettyprint"
                            }
                        },
                        {
                            "pre": {
                                "id": id + "-data",
                                "class": "demo-data prettyprint"
                            }
                        }]
                    }
                }, {
                    "div": {
                        "class": "demo-actions",
                        "$childs": [{
                            "button": {
                                "id": id + "-action",
                                "class": "demo-validate",
                                "$childs": "validate",
                                "$click": function () {
                                    validateForm();
                                }
                            }
                        }, {
                            "button": {
                                "id": id + "-action",
                                "class": "demo-run",
                                "$childs": "run",
                                "$click": function () {
                                    updateDemo();
                                }
                            }
                        }]
                    }
                }]
            }
        }));

        editor = ace.edit(id);
        editor.setTheme("ace/theme/merbivore_soft");
        //editor.getSession().setMode("ace/mode/json");
        editor.setFontSize("1em");
        updateDemo();

        return editor;
    }

    $(function () {
        var i;
        for (i = 0; i < demos.length; i += 1) {
            startEditor("editor" + i, demos[i][0], demos[i][1], demos[i][2]);
        }
    });
});
