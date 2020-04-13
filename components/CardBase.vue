<template>
  <v-card outlined :loading="loading" v-bind="$attrs" v-on="$listeners">
    <template v-if="$slots.image">
      <slot name="image"></slot>
    </template>
    <template v-else-if="imageSrc">
      <v-img :src="imageSrc" :height="imageHeight">
        <v-container v-if="imageText">
          <v-row no-gutters>
            <v-col>
              <span class="headline white--text">{{ imageText }}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </template>

    <template v-if="showToolbar">
      <v-toolbar flat>
        <!-- Title -->
        <template v-if="isIE">
          <!-- can't use 'v-toolbar-title' here for some reason. Thanks IE! -->
          <div>
            <div class="headline">{{ title }}</div>
            <div class="caption">{{ subtitle }}</div>
          </div>
        </template>
        <template v-else>
          <v-toolbar-title v-if="title || subtitle">
            <v-list-item :two-line="!!subtitle">
              <v-list-item-avatar v-if="$slots.titleAvatar">
                <slot name="titleAvatar"></slot>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title v-if="title" class="headline">
                  {{ title }}
                </v-list-item-title>
                <v-list-item-subtitle v-if="subtitle">
                  {{ subtitle }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-toolbar-title>
        </template>

        <v-spacer></v-spacer>

        <!-- Toolbar Text Actions -->
        <v-toolbar-items v-if="$slots.toolbarTextActions">
          <slot name="toolbarTextActions"></slot>
        </v-toolbar-items>

        <!-- Toolbar Icon Actions -->
        <slot name="toolbarIconActions"></slot>
      </v-toolbar>

      <v-divider></v-divider>
    </template>

    <v-expand-transition>
      <div v-if="$slots.expandPrepend">
        <v-card-text>
          <slot name="expandPrepend"></slot>
        </v-card-text>
        <v-divider></v-divider>
      </div>
    </v-expand-transition>

    <v-card-text>
      <template v-if="error">
        <slot v-if="$slots.error" name="error"></slot>
        <v-alert v-else type="error" text border="left">
          {{ errorMessage }}
        </v-alert>
      </template>
      <template v-if="success">
        <slot v-if="$slots.success" name="success"></slot>
        <v-alert v-else type="success" text border="left">
          {{ successMessage }}
        </v-alert>
      </template>

      <v-expand-transition>
        <div v-if="!hideContent">
          <slot></slot>
        </div>
      </v-expand-transition>
    </v-card-text>

    <v-expand-transition>
      <div v-if="$slots.expandAppend">
        <v-divider></v-divider>
        <v-card-text>
          <slot name="expandAppend"></slot>
        </v-card-text>
      </div>
    </v-expand-transition>

    <v-expand-transition>
      <template v-if="!hideActions && (showActions || $slots.actions)">
        <div v-if="$slots.actions">
          <v-divider></v-divider>
          <v-card-actions>
            <slot name="actions"></slot>
          </v-card-actions>
        </div>
        <div v-else>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-fade-transition v-if="linkTo && linkText">
              <router-link v-if="!hideLink" :to="linkTo" class="pr-4">
                {{ linkText }}
              </router-link>
            </v-fade-transition>
            <v-btn
              v-if="showCancelAction"
              color="primary"
              text
              :disabled="loading"
              @click="$emit('cancel')"
            >
              {{ buttonCancelText }}
            </v-btn>
            <v-btn
              color="primary"
              :text="dialog"
              :disabled="loading"
              :loading="loading"
              @click="$emit('submit')"
            >
              {{ buttonSubmitText }}
            </v-btn>
          </v-card-actions>
        </div>
      </template>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { detect } from 'detect-browser'

export default {
  name: 'CardBase',

  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    subtitle: {
      type: String,
      required: false,
      default: null
    },

    dialog: {
      type: Boolean,
      required: false,
      default: false
    },

    imageSrc: {
      type: String,
      required: false,
      default: null
    },
    imageText: {
      type: String,
      required: false,
      default: null
    },
    imageHeight: {
      type: String,
      required: false,
      default: '200px'
    },

    loading: {
      type: Boolean,
      default: false
    },

    error: {
      type: Boolean,
      default: false
    },
    errorMessage: {
      type: String,
      required: false,
      default() {
        return this.$t('messages.error')
      }
    },
    hideContentOnError: {
      type: Boolean,
      required: false,
      default: false
    },
    hideActionsOnError: {
      type: Boolean,
      required: false,
      default: false
    },

    success: {
      type: Boolean,
      default: false
    },
    successMessage: {
      type: String,
      required: false,
      default() {
        return this.$t('messages.success')
      }
    },
    hideContentOnSuccess: {
      type: Boolean,
      required: false,
      default: false
    },
    hideActionsOnSuccess: {
      type: Boolean,
      required: false,
      default: false
    },

    showActions: {
      type: Boolean,
      required: false,
      default: false
    },
    showCancelAction: {
      type: Boolean,
      required: false,
      default: false
    },

    buttonSubmitText: {
      type: String,
      required: false,
      default() {
        return this.$t('misc.submit')
      }
    },
    buttonCancelText: {
      type: String,
      required: false,
      default() {
        return this.$t('misc.cancel')
      }
    },

    hideLink: {
      type: Boolean,
      required: false,
      default: false
    },
    linkTo: {
      type: Object,
      required: false,
      default: null
    },
    linkText: {
      type: String,
      required: false,
      default: null
    }
  },

  computed: {
    isIE() {
      const browser = detect()
      return browser && browser.name === 'ie'
    },
    hideContent() {
      return (
        (this.error && this.hideContentOnError) ||
        (this.success && this.hideContentOnSuccess)
      )
    },
    hideActions() {
      return (
        (this.error && this.hideActionsOnError) ||
        (this.success && this.hideActionsOnSuccess)
      )
    },

    showToolbar() {
      return (
        this.title ||
        this.subtitle ||
        this.$slots.toolbarTextActions ||
        this.$slots.toolbarIconActions
      )
    }
  },

  watch: {
    error: {
      handler(val) {
        this.$nextTick(() => {
          if (!val) {
            this.$emit('show:content')
          } else {
            this.$emit('hide:content')
          }
        })
      },
      immediate: true
    }
  }
}
</script>
