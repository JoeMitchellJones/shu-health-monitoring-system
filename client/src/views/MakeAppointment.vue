<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <h3>Make an Appointment</h3>
      </div>
    </div>
    <hr />
    <div class="row">
      <div class="col">
        <form @submit.prevent="onSubmit">
          <div class="form-group">
            <label>Date</label>
            <date-picker
              :minute-step="15"
              :show-second="false"
              v-model="date"
              :full-month-name="true"
              type="datetime"
            ></date-picker>
          </div>
          <div class="form-group">
            <label for="reason">Reason</label>
            <textarea
              v-model="reason"
              name="reason"
              id="reason"
              cols="30"
              rows="10"
              class="form-control"
            ></textarea>
          </div>
          <input
            type="submit"
            class="btn btn-primary"
            value="Make appointment!"
          />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import moment from 'moment';

export default {
  data() {
    /**
     * Holds the requested date for the appointment as well as the reason for the appointment
     */
    return {
      reason: '',
      date: new Date()
    };
  },
  components: {
    DatePicker
  },
  methods: {
    /**
     * Handles form submission
     */
    onSubmit() {
      this.$store
        .dispatch('makeAppointment', {
          appointment_date: moment(this.date).format('YYYY-MM-DD hh:mm:ss'),
          reason: this.reason
        })
        .then(() => {
          this.date = '';
          this.reason = '';
        });
    }
  }
};
</script>

<style></style>
