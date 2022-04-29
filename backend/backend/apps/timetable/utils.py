from datetime import date, datetime, time, timedelta

from ..core.models import School
from .models import Bell


def generate_bell(n: int, school: School) -> Bell:
    """Generate `Bell` object for the specified school.

    This function should be used to generate a bell
    in case it's missing.
    """
    SCHOOL_DAY_START = datetime.combine(date.today(), time(9, 0, 0))
    BREAK = timedelta(minutes=15)
    LESSON_DURATION = timedelta(minutes=40)

    start = SCHOOL_DAY_START + n * LESSON_DURATION + n * BREAK
    end = start + LESSON_DURATION
    return Bell.objects.create(n=n, start=start, end=end, school=school)
