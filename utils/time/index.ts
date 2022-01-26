export module DateTime {
  function weekStart(): Date {
    const today = new Date();
    today.setDate(today.getDate() - today.getDay());
    today.setHours(0, 0, 0, 0);
    return today;
  }
}
