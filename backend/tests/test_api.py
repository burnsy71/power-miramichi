"""Backend API tests for Shawn Power for Mayor website"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestVolunteers:
    """Volunteer endpoint tests"""

    def test_post_volunteer(self):
        response = requests.post(f"{BASE_URL}/api/volunteers", json={
            "name": "TEST_John Doe",
            "email": "TEST_john@example.com",
            "phone": "506-555-1234",
            "message": "I want to help!"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_John Doe"
        assert data["email"] == "TEST_john@example.com"
        assert "id" in data
        assert "created_at" in data

    def test_post_volunteer_minimal(self):
        """Only required fields"""
        response = requests.post(f"{BASE_URL}/api/volunteers", json={
            "name": "TEST_Jane Doe",
            "email": "TEST_jane@example.com"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Jane Doe"

    def test_post_volunteer_missing_name(self):
        response = requests.post(f"{BASE_URL}/api/volunteers", json={
            "email": "TEST_no_name@example.com"
        })
        assert response.status_code == 422

    def test_post_volunteer_missing_email(self):
        response = requests.post(f"{BASE_URL}/api/volunteers", json={
            "name": "TEST_No Email"
        })
        assert response.status_code == 422

    def test_get_volunteers(self):
        response = requests.get(f"{BASE_URL}/api/volunteers")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestContact:
    """Contact endpoint tests"""

    def test_post_contact(self):
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_Contact User",
            "email": "TEST_contact@example.com",
            "message": "Test message"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["name"] == "TEST_Contact User"
        assert data["email"] == "TEST_contact@example.com"
        assert "id" in data

    def test_post_contact_missing_message(self):
        response = requests.post(f"{BASE_URL}/api/contact", json={
            "name": "TEST_User",
            "email": "TEST_user@example.com"
        })
        assert response.status_code == 422

    def test_get_contact_messages(self):
        response = requests.get(f"{BASE_URL}/api/contact")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
