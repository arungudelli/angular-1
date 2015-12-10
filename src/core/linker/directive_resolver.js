'use strict';var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var di_1 = require('angular2/src/core/di');
var lang_1 = require('angular2/src/facade/lang');
var exceptions_1 = require('angular2/src/facade/exceptions');
var collection_1 = require('angular2/src/facade/collection');
var metadata_1 = require('angular2/src/core/metadata');
var reflection_1 = require('angular2/src/core/reflection/reflection');
function _isDirectiveMetadata(type) {
    return type instanceof metadata_1.DirectiveMetadata;
}
/*
 * Resolve a `Type` for {@link DirectiveMetadata}.
 *
 * This interface can be overridden by the application developer to create custom behavior.
 *
 * See {@link Compiler}
 */
var DirectiveResolver = (function () {
    function DirectiveResolver() {
    }
    /**
     * Return {@link DirectiveMetadata} for a given `Type`.
     */
    DirectiveResolver.prototype.resolve = function (type) {
        var typeMetadata = reflection_1.reflector.annotations(di_1.resolveForwardRef(type));
        if (lang_1.isPresent(typeMetadata)) {
            var metadata = typeMetadata.find(_isDirectiveMetadata);
            if (lang_1.isPresent(metadata)) {
                var propertyMetadata = reflection_1.reflector.propMetadata(type);
                return this._mergeWithPropertyMetadata(metadata, propertyMetadata);
            }
        }
        throw new exceptions_1.BaseException("No Directive annotation found on " + lang_1.stringify(type));
    };
    DirectiveResolver.prototype._mergeWithPropertyMetadata = function (dm, propertyMetadata) {
        var inputs = [];
        var outputs = [];
        var host = {};
        var queries = {};
        collection_1.StringMapWrapper.forEach(propertyMetadata, function (metadata, propName) {
            metadata.forEach(function (a) {
                if (a instanceof metadata_1.InputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        inputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        inputs.push(propName);
                    }
                }
                if (a instanceof metadata_1.OutputMetadata) {
                    if (lang_1.isPresent(a.bindingPropertyName)) {
                        outputs.push(propName + ": " + a.bindingPropertyName);
                    }
                    else {
                        outputs.push(propName);
                    }
                }
                if (a instanceof metadata_1.HostBindingMetadata) {
                    if (lang_1.isPresent(a.hostPropertyName)) {
                        host[("[" + a.hostPropertyName + "]")] = propName;
                    }
                    else {
                        host[("[" + propName + "]")] = propName;
                    }
                }
                if (a instanceof metadata_1.HostListenerMetadata) {
                    var args = lang_1.isPresent(a.args) ? a.args.join(', ') : '';
                    host[("(" + a.eventName + ")")] = propName + "(" + args + ")";
                }
                if (a instanceof metadata_1.ContentChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof metadata_1.ViewChildrenMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof metadata_1.ContentChildMetadata) {
                    queries[propName] = a;
                }
                if (a instanceof metadata_1.ViewChildMetadata) {
                    queries[propName] = a;
                }
            });
        });
        return this._merge(dm, inputs, outputs, host, queries);
    };
    DirectiveResolver.prototype._merge = function (dm, inputs, outputs, host, queries) {
        var mergedInputs = lang_1.isPresent(dm.inputs) ? collection_1.ListWrapper.concat(dm.inputs, inputs) : inputs;
        var mergedOutputs = lang_1.isPresent(dm.outputs) ? collection_1.ListWrapper.concat(dm.outputs, outputs) : outputs;
        var mergedHost = lang_1.isPresent(dm.host) ? collection_1.StringMapWrapper.merge(dm.host, host) : host;
        var mergedQueries = lang_1.isPresent(dm.queries) ? collection_1.StringMapWrapper.merge(dm.queries, queries) : queries;
        if (dm instanceof metadata_1.ComponentMetadata) {
            return new metadata_1.ComponentMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                changeDetection: dm.changeDetection,
                providers: dm.providers,
                viewProviders: dm.viewProviders
            });
        }
        else {
            return new metadata_1.DirectiveMetadata({
                selector: dm.selector,
                inputs: mergedInputs,
                outputs: mergedOutputs,
                host: mergedHost,
                exportAs: dm.exportAs,
                moduleId: dm.moduleId,
                queries: mergedQueries,
                providers: dm.providers
            });
        }
    };
    DirectiveResolver = __decorate([
        di_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], DirectiveResolver);
    return DirectiveResolver;
})();
exports.DirectiveResolver = DirectiveResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlyZWN0aXZlX3Jlc29sdmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2RpcmVjdGl2ZV9yZXNvbHZlci50cyJdLCJuYW1lcyI6WyJfaXNEaXJlY3RpdmVNZXRhZGF0YSIsIkRpcmVjdGl2ZVJlc29sdmVyIiwiRGlyZWN0aXZlUmVzb2x2ZXIuY29uc3RydWN0b3IiLCJEaXJlY3RpdmVSZXNvbHZlci5yZXNvbHZlIiwiRGlyZWN0aXZlUmVzb2x2ZXIuX21lcmdlV2l0aFByb3BlcnR5TWV0YWRhdGEiLCJEaXJlY3RpdmVSZXNvbHZlci5fbWVyZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLG1CQUE0QyxzQkFBc0IsQ0FBQyxDQUFBO0FBQ25FLHFCQUFrRCwwQkFBMEIsQ0FBQyxDQUFBO0FBQzdFLDJCQUE0QixnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdELDJCQUE0QyxnQ0FBZ0MsQ0FBQyxDQUFBO0FBQzdFLHlCQVdPLDRCQUE0QixDQUFDLENBQUE7QUFDcEMsMkJBQXdCLHlDQUF5QyxDQUFDLENBQUE7QUFFbEUsOEJBQThCLElBQVM7SUFDckNBLE1BQU1BLENBQUNBLElBQUlBLFlBQVlBLDRCQUFpQkEsQ0FBQ0E7QUFDM0NBLENBQUNBO0FBRUQ7Ozs7OztHQU1HO0FBQ0g7SUFBQUM7SUErR0FDLENBQUNBO0lBN0dDRDs7T0FFR0E7SUFDSEEsbUNBQU9BLEdBQVBBLFVBQVFBLElBQVVBO1FBQ2hCRSxJQUFJQSxZQUFZQSxHQUFHQSxzQkFBU0EsQ0FBQ0EsV0FBV0EsQ0FBQ0Esc0JBQWlCQSxDQUFDQSxJQUFJQSxDQUFDQSxDQUFDQSxDQUFDQTtRQUNsRUEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsZ0JBQVNBLENBQUNBLFlBQVlBLENBQUNBLENBQUNBLENBQUNBLENBQUNBO1lBQzVCQSxJQUFJQSxRQUFRQSxHQUFHQSxZQUFZQSxDQUFDQSxJQUFJQSxDQUFDQSxvQkFBb0JBLENBQUNBLENBQUNBO1lBQ3ZEQSxF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QUNBLFFBQVFBO2dCQUNyQkEsT0FBT0EsRUFBRUEsYUFBYUE7Z0JBQ3RCQSxlQUFlQSxFQUFFQSxFQUFFQSxDQUFDQSxlQUFlQTtnQkFDbkNBLFNBQVNBLEVBQUVBLEVBQUVBLENBQUNBLFNBQVNBO2dCQUN2QkEsYUFBYUEsRUFBRUEsRUFBRUEsQ0FBQ0EsYUFBYUE7YUFDaENBLENBQUNBLENBQUNBO1FBRUxBLENBQUNBO1FBQUNBLElBQUlBLENBQUNBLENBQUNBO1lBQ05BLE1BQU1BLENBQUNBLElBQUlBLDRCQUFpQkEsQ0FBQ0E7Z0JBQzNCQSxRQUFRQSxFQUFFQSxFQUFFQSxDQUFDQSxRQUFRQTtnQkFDckJBLE1BQU1BLEVBQUVBLFlBQVlBO2dCQUNwQkEsT0FBT0EsRUFBRUEsYUFBYUE7Z0JBQ3RCQSxJQUFJQSxFQUFFQSxVQUFVQTtnQkFDaEJBLFFBQVFBLEVBQUVBLEVBQUVBLENBQUNBLFFBQVFBO2dCQUNyQkEsUUFBUUEsRUFBRUEsRUFBRUEsQ0FBQ0EsUUFBUUE7Z0JBQ3JCQSxPQUFPQSxFQUFFQSxhQUFhQTtnQkFDdEJBLFNBQVNBLEVBQUVBLEVBQUVBLENBQUNBLFNBQVNBO2FBQ3hCQSxDQUFDQSxDQUFDQTtRQUNMQSxDQUFDQTtJQUNIQSxDQUFDQTtJQTlHSEo7UUFBQ0EsZUFBVUEsRUFBRUE7OzBCQStHWkE7SUFBREEsd0JBQUNBO0FBQURBLENBQUNBLEFBL0dELElBK0dDO0FBOUdZLHlCQUFpQixvQkE4RzdCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge3Jlc29sdmVGb3J3YXJkUmVmLCBJbmplY3RhYmxlfSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9kaSc7XG5pbXBvcnQge1R5cGUsIGlzUHJlc2VudCwgaXNCbGFuaywgc3RyaW5naWZ5fSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmcnO1xuaW1wb3J0IHtCYXNlRXhjZXB0aW9ufSBmcm9tICdhbmd1bGFyMi9zcmMvZmFjYWRlL2V4Y2VwdGlvbnMnO1xuaW1wb3J0IHtMaXN0V3JhcHBlciwgU3RyaW5nTWFwV3JhcHBlcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2ZhY2FkZS9jb2xsZWN0aW9uJztcbmltcG9ydCB7XG4gIERpcmVjdGl2ZU1ldGFkYXRhLFxuICBDb21wb25lbnRNZXRhZGF0YSxcbiAgSW5wdXRNZXRhZGF0YSxcbiAgT3V0cHV0TWV0YWRhdGEsXG4gIEhvc3RCaW5kaW5nTWV0YWRhdGEsXG4gIEhvc3RMaXN0ZW5lck1ldGFkYXRhLFxuICBDb250ZW50Q2hpbGRyZW5NZXRhZGF0YSxcbiAgVmlld0NoaWxkcmVuTWV0YWRhdGEsXG4gIENvbnRlbnRDaGlsZE1ldGFkYXRhLFxuICBWaWV3Q2hpbGRNZXRhZGF0YVxufSBmcm9tICdhbmd1bGFyMi9zcmMvY29yZS9tZXRhZGF0YSc7XG5pbXBvcnQge3JlZmxlY3Rvcn0gZnJvbSAnYW5ndWxhcjIvc3JjL2NvcmUvcmVmbGVjdGlvbi9yZWZsZWN0aW9uJztcblxuZnVuY3Rpb24gX2lzRGlyZWN0aXZlTWV0YWRhdGEodHlwZTogYW55KTogYm9vbGVhbiB7XG4gIHJldHVybiB0eXBlIGluc3RhbmNlb2YgRGlyZWN0aXZlTWV0YWRhdGE7XG59XG5cbi8qXG4gKiBSZXNvbHZlIGEgYFR5cGVgIGZvciB7QGxpbmsgRGlyZWN0aXZlTWV0YWRhdGF9LlxuICpcbiAqIFRoaXMgaW50ZXJmYWNlIGNhbiBiZSBvdmVycmlkZGVuIGJ5IHRoZSBhcHBsaWNhdGlvbiBkZXZlbG9wZXIgdG8gY3JlYXRlIGN1c3RvbSBiZWhhdmlvci5cbiAqXG4gKiBTZWUge0BsaW5rIENvbXBpbGVyfVxuICovXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgRGlyZWN0aXZlUmVzb2x2ZXIge1xuICAvKipcbiAgICogUmV0dXJuIHtAbGluayBEaXJlY3RpdmVNZXRhZGF0YX0gZm9yIGEgZ2l2ZW4gYFR5cGVgLlxuICAgKi9cbiAgcmVzb2x2ZSh0eXBlOiBUeXBlKTogRGlyZWN0aXZlTWV0YWRhdGEge1xuICAgIHZhciB0eXBlTWV0YWRhdGEgPSByZWZsZWN0b3IuYW5ub3RhdGlvbnMocmVzb2x2ZUZvcndhcmRSZWYodHlwZSkpO1xuICAgIGlmIChpc1ByZXNlbnQodHlwZU1ldGFkYXRhKSkge1xuICAgICAgdmFyIG1ldGFkYXRhID0gdHlwZU1ldGFkYXRhLmZpbmQoX2lzRGlyZWN0aXZlTWV0YWRhdGEpO1xuICAgICAgaWYgKGlzUHJlc2VudChtZXRhZGF0YSkpIHtcbiAgICAgICAgdmFyIHByb3BlcnR5TWV0YWRhdGEgPSByZWZsZWN0b3IucHJvcE1ldGFkYXRhKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcy5fbWVyZ2VXaXRoUHJvcGVydHlNZXRhZGF0YShtZXRhZGF0YSwgcHJvcGVydHlNZXRhZGF0YSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEJhc2VFeGNlcHRpb24oYE5vIERpcmVjdGl2ZSBhbm5vdGF0aW9uIGZvdW5kIG9uICR7c3RyaW5naWZ5KHR5cGUpfWApO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWVyZ2VXaXRoUHJvcGVydHlNZXRhZGF0YShkbTogRGlyZWN0aXZlTWV0YWRhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlNZXRhZGF0YToge1trZXk6IHN0cmluZ106IGFueVtdfSk6IERpcmVjdGl2ZU1ldGFkYXRhIHtcbiAgICB2YXIgaW5wdXRzID0gW107XG4gICAgdmFyIG91dHB1dHMgPSBbXTtcbiAgICB2YXIgaG9zdDoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgICB2YXIgcXVlcmllczoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcblxuICAgIFN0cmluZ01hcFdyYXBwZXIuZm9yRWFjaChwcm9wZXJ0eU1ldGFkYXRhLCAobWV0YWRhdGE6IGFueVtdLCBwcm9wTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICBtZXRhZGF0YS5mb3JFYWNoKGEgPT4ge1xuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIElucHV0TWV0YWRhdGEpIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGEuYmluZGluZ1Byb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKGAke3Byb3BOYW1lfTogJHthLmJpbmRpbmdQcm9wZXJ0eU5hbWV9YCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlucHV0cy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIE91dHB1dE1ldGFkYXRhKSB7XG4gICAgICAgICAgaWYgKGlzUHJlc2VudChhLmJpbmRpbmdQcm9wZXJ0eU5hbWUpKSB7XG4gICAgICAgICAgICBvdXRwdXRzLnB1c2goYCR7cHJvcE5hbWV9OiAke2EuYmluZGluZ1Byb3BlcnR5TmFtZX1gKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0cHV0cy5wdXNoKHByb3BOYW1lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIEhvc3RCaW5kaW5nTWV0YWRhdGEpIHtcbiAgICAgICAgICBpZiAoaXNQcmVzZW50KGEuaG9zdFByb3BlcnR5TmFtZSkpIHtcbiAgICAgICAgICAgIGhvc3RbYFske2EuaG9zdFByb3BlcnR5TmFtZX1dYF0gPSBwcm9wTmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaG9zdFtgWyR7cHJvcE5hbWV9XWBdID0gcHJvcE5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBIb3N0TGlzdGVuZXJNZXRhZGF0YSkge1xuICAgICAgICAgIHZhciBhcmdzID0gaXNQcmVzZW50KGEuYXJncykgPyAoPGFueVtdPmEuYXJncykuam9pbignLCAnKSA6ICcnO1xuICAgICAgICAgIGhvc3RbYCgke2EuZXZlbnROYW1lfSlgXSA9IGAke3Byb3BOYW1lfSgke2FyZ3N9KWA7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIENvbnRlbnRDaGlsZHJlbk1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGEgaW5zdGFuY2VvZiBWaWV3Q2hpbGRyZW5NZXRhZGF0YSkge1xuICAgICAgICAgIHF1ZXJpZXNbcHJvcE5hbWVdID0gYTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChhIGluc3RhbmNlb2YgQ29udGVudENoaWxkTWV0YWRhdGEpIHtcbiAgICAgICAgICBxdWVyaWVzW3Byb3BOYW1lXSA9IGE7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYSBpbnN0YW5jZW9mIFZpZXdDaGlsZE1ldGFkYXRhKSB7XG4gICAgICAgICAgcXVlcmllc1twcm9wTmFtZV0gPSBhO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICByZXR1cm4gdGhpcy5fbWVyZ2UoZG0sIGlucHV0cywgb3V0cHV0cywgaG9zdCwgcXVlcmllcyk7XG4gIH1cblxuICBwcml2YXRlIF9tZXJnZShkbTogRGlyZWN0aXZlTWV0YWRhdGEsIGlucHV0czogc3RyaW5nW10sIG91dHB1dHM6IHN0cmluZ1tdLFxuICAgICAgICAgICAgICAgICBob3N0OiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSwgcXVlcmllczoge1trZXk6IHN0cmluZ106IGFueX0pOiBEaXJlY3RpdmVNZXRhZGF0YSB7XG4gICAgdmFyIG1lcmdlZElucHV0cyA9IGlzUHJlc2VudChkbS5pbnB1dHMpID8gTGlzdFdyYXBwZXIuY29uY2F0KGRtLmlucHV0cywgaW5wdXRzKSA6IGlucHV0cztcbiAgICB2YXIgbWVyZ2VkT3V0cHV0cyA9IGlzUHJlc2VudChkbS5vdXRwdXRzKSA/IExpc3RXcmFwcGVyLmNvbmNhdChkbS5vdXRwdXRzLCBvdXRwdXRzKSA6IG91dHB1dHM7XG4gICAgdmFyIG1lcmdlZEhvc3QgPSBpc1ByZXNlbnQoZG0uaG9zdCkgPyBTdHJpbmdNYXBXcmFwcGVyLm1lcmdlKGRtLmhvc3QsIGhvc3QpIDogaG9zdDtcbiAgICB2YXIgbWVyZ2VkUXVlcmllcyA9XG4gICAgICAgIGlzUHJlc2VudChkbS5xdWVyaWVzKSA/IFN0cmluZ01hcFdyYXBwZXIubWVyZ2UoZG0ucXVlcmllcywgcXVlcmllcykgOiBxdWVyaWVzO1xuXG4gICAgaWYgKGRtIGluc3RhbmNlb2YgQ29tcG9uZW50TWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiBuZXcgQ29tcG9uZW50TWV0YWRhdGEoe1xuICAgICAgICBzZWxlY3RvcjogZG0uc2VsZWN0b3IsXG4gICAgICAgIGlucHV0czogbWVyZ2VkSW5wdXRzLFxuICAgICAgICBvdXRwdXRzOiBtZXJnZWRPdXRwdXRzLFxuICAgICAgICBob3N0OiBtZXJnZWRIb3N0LFxuICAgICAgICBleHBvcnRBczogZG0uZXhwb3J0QXMsXG4gICAgICAgIG1vZHVsZUlkOiBkbS5tb2R1bGVJZCxcbiAgICAgICAgcXVlcmllczogbWVyZ2VkUXVlcmllcyxcbiAgICAgICAgY2hhbmdlRGV0ZWN0aW9uOiBkbS5jaGFuZ2VEZXRlY3Rpb24sXG4gICAgICAgIHByb3ZpZGVyczogZG0ucHJvdmlkZXJzLFxuICAgICAgICB2aWV3UHJvdmlkZXJzOiBkbS52aWV3UHJvdmlkZXJzXG4gICAgICB9KTtcblxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbmV3IERpcmVjdGl2ZU1ldGFkYXRhKHtcbiAgICAgICAgc2VsZWN0b3I6IGRtLnNlbGVjdG9yLFxuICAgICAgICBpbnB1dHM6IG1lcmdlZElucHV0cyxcbiAgICAgICAgb3V0cHV0czogbWVyZ2VkT3V0cHV0cyxcbiAgICAgICAgaG9zdDogbWVyZ2VkSG9zdCxcbiAgICAgICAgZXhwb3J0QXM6IGRtLmV4cG9ydEFzLFxuICAgICAgICBtb2R1bGVJZDogZG0ubW9kdWxlSWQsXG4gICAgICAgIHF1ZXJpZXM6IG1lcmdlZFF1ZXJpZXMsXG4gICAgICAgIHByb3ZpZGVyczogZG0ucHJvdmlkZXJzXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==