// /api/utils/urgencyScore.js

function calculateUrgencyScore(priority, dueDate) {
    const priorityWeights = { Low: 1, Medium: 5, High: 10 };

    if (!priorityWeights[priority]) throw new Error("Invalid priority value");

    // Convert dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);

    // Days until due (negative if overdue)
    const daysUntilDue = Math.ceil((due - today) / (1000 * 60 * 60 * 24));

    // Max days limit for urgency scaling (e.g., 14 days)
    const maxDays = 14;

    // Calculate urgency score
    const urgencyScore = priorityWeights[priority] + (maxDays - daysUntilDue);
    const finalScore = Math.max(urgencyScore, 0); // Ensure score is non-negative

    // Categorize urgency level
    let urgencyLevel;
    if (finalScore >= 20) {
        urgencyLevel = "Very Urgent 🚨";
    } else if (finalScore >= 15) {
        urgencyLevel = "Urgent ⚠️";
    } else if (finalScore >= 10) {
        urgencyLevel = "Moderate 🟡";
    } else if (finalScore >= 5) {
        urgencyLevel = "Low 🟢";
    } else {
        urgencyLevel = "Minimal ⚪";
    }

    return { urgencyScore: finalScore, urgencyLevel };
}

module.exports = calculateUrgencyScore;
