<template>
    <div>
        <v-card-actions>
            <v-btn
                text
                @click="show = !show"
            >
                {{ funktion }}
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn
                icon
                @click="show = !show"
            >
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
            </v-btn>
        </v-card-actions>

        <v-expand-transition>
            <div v-show="show">
                <v-divider></v-divider>
                <v-simple-table class="grey lighten-5" width="100px">
                    <template v-slot:default>
                    <thead>
                        <tr>
                        <th class="text-left">
                            Name
                        </th>
                        <th class="text-left">
                            Description
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                        v-for="item in zweiteGrundfunktion"
                        :key="item.name"
                        >
                        <td class="text-left">{{ item.name }}</td>
                        <td class="text-left">{{ item.description }}</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
            </div>
        </v-expand-transition>
    </div>
</template>

<script>
export default {
  data: () => ({
    show: false
  }),
  props: {
    zweiteGrundfunktion: Array,
    funktion: String
  }
}
</script>
