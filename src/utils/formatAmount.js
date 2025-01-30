export const formatAmount = (amount, t) => {
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(1)} ${t("l")}`;
  }
  return `${amount} ${t("ml")}`;
};
