<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <v-list-item v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <v-list-item-icon>
          <v-icon>{{onlyOneChild.meta.icon||(item.meta&&item.meta.icon)}}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{onlyOneChild.meta.title}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <ListItem
      v-else
      v-for="child in item.children"
      :key="child.path"
      :is-nest="true"
      :item="child"
      :base-path="resolvePath(child.path)"
    />
  </div>
</template>

<script>
import path from "path";

export default {
  name: "ListItem",
  data() {
    // To fix https://github.com/PanJiaChen/vue-admin-template/issues/237
    // TODO: refactor with render function
    this.onlyOneChild = null;
    return {};
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // Temp set(will be used if only has one showing child)
          this.onlyOneChild = item;
          return true;
        }
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      //   if (isExternal(routePath)) {
      //     return routePath;
      //   }
      //   if (isExternal(this.basePath)) {
      //     return this.basePath;
      //   }
      return path.resolve(this.basePath, routePath);
    }
  },

  props: {
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
</style>